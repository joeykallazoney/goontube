# :hamburger: [goontube](https://goontu.be/)

Video synchronization and chat lounge.  

Much needed overhaul + rewrite as an ES6 webapp with React + Redux.  

### Roadmap

- [x] Thing
- [ ] Another thing
- [ ] Bring Google docs points in

### Streaming provider spec

#### Installation + Setup

```
git clone https://github.com/goontube/goontube.git
cd goontube
npm install
```

#### Development

```
webpack-dev-server ./client.js
```

Then visit [http://localhost:8080/bundle](http://localhost:8080/bundle) to access a webpack-dev-server for the frontend.

`npm install -g pm2` and then use `pm2-dev ./index.js` to work on the backend with reload on change.

#### Usage

```
webpack
npm start
```
