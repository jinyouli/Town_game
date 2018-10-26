"use strict";
cc._RF.push(module, '913eaHnhzdPb5pvLL1z0Eo0', 'nav_agent');
// scripts/nav_agent.js

"use strict";

var map_gen = require("map_gen");

cc.Class({
    extends: cc.Component,

    properties: {

        speed: 100,

        map: {
            type: map_gen,
            default: null
        }
    },

    start: function start() {
        this.road_set = this.map.get_road_set();

        this.road_data = this.road_set[0];
        this.next_step = 1;
        this.is_walking = false;
        this.walk_on_road();
    },
    walk_on_road: function walk_on_road() {
        if (this.road_data.length < 2) {
            return;
        }
        this.node.setPosition(this.road_data[0]);
        this.walk_on_next();
    },
    walk_on_next: function walk_on_next() {
        if (this.next_step >= this.road_data.length) {
            this.is_walking = false;
            return;
        }
        this.is_walking = true;
        var src = this.node.getPosition();
        var dst = this.road_data[this.next_step];
        var dir = dst.sub(src);
        var len = dir.mag();

        this.walk_time = len / this.speed;
        this.now_time = 0;

        this.vx = this.speed * dir.x / len;
        this.vy = this.speed * dir.y / len;
    },
    update: function update(dt) {
        if (this.is_walking == false) {
            return;
        }

        this.now_time += dt;
        if (this.now_time > this.walk_time) {
            dt -= this.now_time - this.walk_time;
        }

        this.node.x += this.vx * dt;
        this.node.y += this.vy * dt;

        if (this.now_time >= this.walk_time) {
            this.next_step++;
            this.walk_on_next();
        }
    }
});

cc._RF.pop();