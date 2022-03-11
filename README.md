# Setup and build 
1.	run `yarn install`
2.  run `npm run webpack` => the result should be a `dist/details.js` file

upon building, webpack a warning will show up (not critical):


```bash
WARNING in ./node_modules/@looker/extension-sdk-react/lib/esm/components/RouteChangeListener/RouteChangeListener.js 12:16-26
export 'useHistory' (imported as 'useHistory') was not found in 'react-router-dom'
```
to get rid of it, monkey patch the file `node_modules/@looker/extension-sdk-react/lib/esm/components/RouteChangeListener/RouteChangeListener.js` by replacing the 2 `useHistory` occurences by `useNavigate`