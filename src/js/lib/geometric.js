export class Vec2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromPolar(angle, radius) {
        return new Vec2d(radius * Math.cos(angle), radius * Math.sin(angle));
    }
    static fromPolarElipse(angle, radiusX, radiusY) {
        // Find the intersection of the ellipse and the line at the given angle from the center using these formulas
        // x = r * cos(angle), y = r * sin(angle)
        // (x/radiusX)^2 + (y/radiusY)^2 = 1
        // Substitute x and y:
        // (r*cos(angle)/radiusX)^2 + (r*sin(angle)/radiusY)^2 = 1
        // r^2 * (cos^2(angle)/radiusX^2 + sin^2(angle)/radiusY^2) = 1
        // r^2 = 1 / (cos^2(angle)/radiusX^2 + sin^2(angle)/radiusY^2)
        // r = sqrt(1 / (cos^2(angle)/radiusX^2 + sin^2(angle)/radiusY^2))
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const denom = (cosA * cosA) / (radiusX * radiusX) + (sinA * sinA) / (radiusY * radiusY);
        const r = Math.sqrt(1 / denom);
        return new Vec2d(r * cosA, r * sinA);
    }
    add(v) {
        return new Vec2d(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vec2d(this.x - v.x, this.y - v.y);
    }
    multiply(scalar) {
        return new Vec2d(this.x * scalar, this.y * scalar);
    }
    divide(scalar) {
        return new Vec2d(this.x / scalar, this.y / scalar);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normal() {
        return this.divide(this.magnitude());
    }
    distance(v) {
        return this.sub(v).magnitude();
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    rotate(angle) {
        return new Vec2d(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
    }
    clone() {
        return new Vec2d(this.x, this.y);
    }
}

export class Rectangle {
    constructor({x, y, width, height, originX = 0.5, originY = 0.5, rotation = 0}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.originX = originX;
        this.originY = originY;
        this.rotation = rotation; // Rotation in radians
    }

    rotate(angle) {
        this.rotation += angle; // Add the angle to the current rotation
    }
    rotateDeg(angle) {
        this.rotation += angle * Math.PI / 180; // Convert the angle to radians and add it to the current rotation
    }

    getVertices() {
        const cos = Math.cos(this.rotation);
        const sin = Math.sin(this.rotation);

        const hw = this.width * this.originX;
        const hh = this.height * this.originY;

        const vertices = [
            { x: -hw, y: -hh },
            { x: this.width - hw, y: -hh },
            { x: this.width - hw, y: this.height - hh },
            { x: -hw, y: this.height - hh },
        ];

        return vertices.map(v => new Vec2d(
            this.x + v.x * cos - v.y * sin,
            this.y + v.x * sin + v.y * cos
        ));
    }
    getEdges() {
        const vertices = this.getVertices();
        const edges = [];

        for (let i = 0; i < vertices.length; i++) {
            const nextIndex = (i + 1) % vertices.length;
            edges.push(vertices[nextIndex].sub(vertices[i]));
        }

        return edges;
    }
}

export class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}