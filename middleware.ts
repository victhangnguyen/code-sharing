import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  // An array of public routes that don't require authentication.
  publicRoutes: [
    '/',
    '/api/webhook/clerk',
    '/question/:id',
    '/tags',
    '/tags/:id',
    '/profile/:id',
    '/community',
    '/jobs'
  ],
  // An array of routes to be ignored by the authentication middleware.
  ignoredRoutes: ['/api/webhook/clerk', '/api/chatgpt']
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
