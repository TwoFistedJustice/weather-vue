// import HelloWorld from "../components/HelloWorld";
import Weather from "../components/Weather";


const routes = [
  {path: '/',
    name: 'weather',
    component: Weather
 },
  {
    path: '/weather',
    name: 'weather',
    component: Weather
  }
 
];


export {routes as default};