import { useState as _useState, useEffect } from 'react'
import { render } from 'react-dom'

interface IStringMap<T> {
  [key: string]: T,
}

function useState<T extends IStringMap<any>>(obj: T): {[key in keyof T]: any} {
  const descriptors: PropertyDescriptorMap = Object.keys(obj).reduce((p, c) => {
    const [v, setV] = _useState(obj[c])
    return {
      ...p,
      [c]: {
        get() {
          return v
        },
        set(newV: any) {
          setV(newV)
        },
      },
    }
  }, {})

  return Object.defineProperties({}, descriptors)
}

export {
  useState,
  useEffect,
  render,
}
