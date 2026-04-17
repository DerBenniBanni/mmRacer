
export function checkVec2dRectangleCollision(v, r) {
    let vertices = r.getVertices();
    let edges = r.getEdges();

    for (let i = 0; i < edges.length; i++) {
        let axis = edges[i].normal();
        let minMax1 = getMinMax(v, axis);
        let minMax2 = getMinMax(vertices[0], axis);

        for (let j = 1; j < vertices.length; j++) {
            let dot = vertices[j].dot(axis);
            minMax2[0] = Math.min(minMax2[0], dot);
            minMax2[1] = Math.max(minMax2[1], dot);
        }

        if (minMax1[0] > minMax2[1] || minMax1[1] < minMax2[0]) {
            return false;
        }
    }

    return true;
}

function getMinMax(v, normal) {
    const dot = v.dot(normal);
    return [dot, dot];
}

export function checkRectanglesCollision(r1, r2) {
    let vertices1 = r1.getVertices();
    let edges1 = r1.getEdges();
    let vertices2 = r2.getVertices();
    let edges2 = r2.getEdges();

    for (let i = 0; i < edges1.length; i++) {
        let axis = edges1[i].normal();
        let minMax1 = getMinMax(vertices1[0], axis);
        let minMax2 = getMinMax(vertices2[0], axis);
        for (let j = 1; j < vertices1.length; j++) {
            let dot = vertices1[j].dot(axis);
            minMax1[0] = Math.min(minMax1[0], dot);
            minMax1[1] = Math.max(minMax1[1], dot);
        }
        for (let j = 1; j < vertices2.length; j++) {
            let dot = vertices2[j].dot(axis);
            minMax2[0] = Math.min(minMax2[0], dot);
            minMax2[1] = Math.max(minMax2[1], dot);
        }
        if (minMax1[0] > minMax2[1] || minMax1[1] < minMax2[0]) {
            return false;
        }
    }

    for (let i = 0; i < edges2.length; i++) {
        let axis = edges2[i].normal();
        let minMax1 = getMinMax(vertices1[0], axis);
        let minMax2 = getMinMax(vertices2[0], axis);
        for (let j = 1; j < vertices1.length; j++) {
            let dot = vertices1[j].dot(axis);
            minMax1[0] = Math.min(minMax1[0], dot);
            minMax1[1] = Math.max(minMax1[1], dot);
        }
        for (let j = 1; j < vertices2.length; j++) {
            let dot = vertices2[j].dot(axis);
            minMax2[0] = Math.min(minMax2[0], dot);
            minMax2[1] = Math.max(minMax2[1], dot);
        }
        if (minMax1[0] > minMax2[1] || minMax1[1] < minMax2[0]) {
            return false;
        }
    }

    return true;
}

export function checkCirclesCollision(c1, c2) {
    let dx = c1.x - c2.x;
    let dy = c1.y - c2.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < c1.radius + c2.radius;
}

export function checkCirclePointCollision(c, p) {
    let dx = c.x - p.x;
    let dy = c.y - p.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < c.radius;
}

export function checkCircleRectangleCollision(c, rect) {
    let vertices = rect.getVertices();
    let edges = rect.getEdges();
    let closestPoint = null;
    let minDist = Infinity;
    for (let i = 0; i < edges.length; i++) {
        let edge = edges[i];
        let vertex = vertices[i];
        let t = ((c.x - vertex.x) * edge.x + (c.y - vertex.y) * edge.y) / (edge.x * edge.x + edge.y * edge.y);
        t = Math.max(0, Math.min(1, t));
        let closestX = vertex.x + t * edge.x;
        let closestY = vertex.y + t * edge.y;
        let dist = Math.sqrt((closestX - c.x) ** 2 + (closestY - c.y) ** 2);
        if (dist < minDist) {
            minDist = dist;
            closestPoint = { x: closestX, y: closestY };
        }
    }
    return minDist < c.radius;
}

