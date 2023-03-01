import {  readdirSync } from "node:fs";

class Route {
  constructor() {
    this.routeDir = `${process.cwd()}/routes/`;
  }

  getRouteDir() {
    return this.routeDir;
  }

  getRouteList() {
    const routeList = new Map();
    readdirSync(this.routeDir).forEach(file => {
      const domain = file.replace('.js', '');
      const router = this.routeDir + domain;

      routeList.set(domain, router);
    });

    return routeList;
  }
}

export default new Route();
