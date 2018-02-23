import mpath from 'mpath'

export function parse(args, base) {
  const regex = /^--/
  const result = base || {}

  for (const index in args) {
    const name = args[index]

    if (regex.test(name)) {
      const value = args[1 + Number(index)]
      const path = name.replace(regex, '').replace('-', '.')
      mpath.set(path, value, result)
    }
  }

  return result
}
