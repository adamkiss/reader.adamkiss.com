# reader.adamkiss.com

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Design document

This is just a short note for me to compile what I actually want this microapp to do, so I can design v1.

### What this app actually does

- Navigate to index
	1. Show index
- Navigate to reader (from bookmarklet or URL)
	1. Show preloader (default page state?)
	2. Call a Netlify function with current request
	3. Return a page
		- replace a header, content and footer
		- stop "loading state"
		- prepare navigation
- Navigate to reader (from loaded "app")
	1. Show loader (loading state? the same as preloader?)
	2. Call netlify function **with parameters** instead of "request"
	3. Get new header, content, and footer
	4. Replace all and potentially overtake all links again?

### Questions
- Is it faster to just dump the whole body and replace it, wholesale?
- Is it better/faster to actually manage header/footer as a components?

### "Static", mostly functions based app
- [Swup](https://swup.js.org) or [Turbolinks](https://github.com/turbolinks/turbolinks) or Barba.js
- proxy all requests other than / to reader.html? Or straight to .functions?
