import routes from 'next-routes'

const router = new routes()

router
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaign/:address/requests', '/campaigns/requests/index')
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new')

export const Link = router.Link
export const Router = router.Router
export default router
