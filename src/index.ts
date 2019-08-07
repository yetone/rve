import { useReducer, useEffect, Dispatch } from 'react'
import { render } from 'react-dom'
import objectPath from 'object-path'
import immutable from 'object-path-immutable'

const ObjectType = '[object Object]'
const ArrayType = '[object Array]'
const ComplexTypes = [ObjectType, ArrayType]

interface IAction<T> {
  state: T,
}

function isComplexObj(obj: any): boolean {
  return isComplexType(Object.prototype.toString.call(obj))
}

function isComplexType(type: string): boolean {
  return ComplexTypes.indexOf(type) >= 0
}

function toPlainObj<T>(obj: T): T
function toPlainObj(obj: any): any {
  const type = Object.prototype.toString.call(obj)
  if (!isComplexType(type)) {
    return obj
  }
  if (type === ObjectType) {
    return Object.keys(obj).reduce((p, c) => {
      return {
        ...p,
        [c]: toPlainObj(obj[c]),
      }
    }, {})
  }
  if (type === ArrayType) {
    return obj.map(toPlainObj)
  }
}

function reducer<T>(_: T, action: IAction<T>) {
  return action.state
}

function value<T>(obj: T): {value: T} {
  return useState({value: obj})
}

function useState<T>(obj: T): T {
  const [state, dispatch] = useReducer(reducer, obj);

  return doUseState(state, dispatch, obj, [])
}

function doUseState<T>(state: T, dispatch: Dispatch<IAction<T>>, obj: T, path: string[]): T {
  const type = Object.prototype.toString.call(obj)

  const descriptors: PropertyDescriptorMap = Object.keys(obj).reduce((p, c) => {
    const newPath = [...path, c]
    let v = objectPath.get(state as any, newPath)

    if (isComplexObj(v)) {
      v = doUseState(state, dispatch, v, newPath)
    }

    return {
      ...p,
      [c]: {
        enumerable: true,
        get() {
          return v
        },
        set(newV: any) {
          newV = toPlainObj(newV)
          state = immutable.set(state, newPath, newV)

          dispatch({
            state,
          })
        },
      },
    }
  }, {})

  if (type === ObjectType) {
    return Object.defineProperties({}, descriptors)
  }
  return Object.defineProperties([], descriptors)
}

export {
  value,
  useState,
  useEffect,
  render,
}
