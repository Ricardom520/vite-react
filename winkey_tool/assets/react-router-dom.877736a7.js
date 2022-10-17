import{r as o}from"./react.03cc10e8.js";import{j as l,R as u}from"./react-router.35a75e22.js";import{c as f}from"./@remix-run.5f363a48.js";/**
 * React Router DOM v6.4.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function y(a){let{basename:n,children:i,window:s}=a,e=o.exports.useRef();e.current==null&&(e.current=f({window:s,v5Compat:!0}));let t=e.current,[r,c]=o.exports.useState({action:t.action,location:t.location});return o.exports.useLayoutEffect(()=>t.listen(c),[t]),l(u,{basename:n,children:i,location:r.location,navigationType:r.action,navigator:t})}export{y as B};
