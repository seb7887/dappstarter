import micro, { send } from 'micro'

import { getFactory } from '../../blockchain'

// @ts-ignore
export default micro(async (req, res) => {
  const factory = await getFactory()
  send(res, 200, factory)
})
