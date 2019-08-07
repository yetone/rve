import { useReducer, useEffect, Dispatch } from 'react'
import { render } from 'react-dom'
import objectPath from 'object-path'
import immutable from 'object-path-immutable'

interface IStringMap<T> {
  [key: string]: T,
}

interface IAction {
  type: 'set' | 'del' | 'state',
  path: string[],
  value?: any,
}

function isComplexObj(obj: any): boolean {
  return isComplexType(Object.prototype.toString.call(obj))
}

function isComplexType(type: string): boolean {
  return ['[object Object]', '[object Array]'].indexOf(type) >= 0
}

function toPlainObj<T>(obj: T): T
function toPlainObj(obj: any): any {
  const type = Object.prototype.toString.call(obj)
  if (!isComplexType(type)) {
    return obj
  }
  if (type === '[object Object]') {
    return Object.keys(obj).reduce((p, c) => {
      return {
        ...p,
        [c]: toPlainObj(obj[c]),
      }
    }, {})
  }
  if (type === '[object Array]') {
    return obj.map(toPlainObj)
  }
}

function reducer(state: IStringMap<any>, action: IAction) {
  switch (action.type) {
    case 'set':
      return immutable.set(state, action.path, action.value)
    case 'del':
      return immutable.del(state, action.path)
    case 'state':
      return action.value
    default:
      throw new Error(`reducer not support ${action.type} now!`)
  }
}

function value<T>(obj: T): {value: T} {
  return useState({value: obj})
}

function useState<T>(obj: T): T
function useState(obj: any): any {
  const [state, dispatch] = useReducer(reducer, obj);

  return doUseState(state, dispatch, obj, [])
}

function doUseState<T>(state: T, dispatch: Dispatch<IAction>, obj: T, path: string[]): T
function doUseState(state: any, dispatch: Dispatch<IAction>, obj: any, path: string[]): any {
  const type = Object.prototype.toString.call(obj)

  const descriptors: PropertyDescriptorMap = Object.keys(obj).reduce((p, c) => {
    const newPath = [...path, c]

    let v = objectPath.get(state, newPath)

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
            type: 'state',
            path: [],
            value: state,
          })
        },
      },
    }
  }, {})

  if (type === '[object Object]') {
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
