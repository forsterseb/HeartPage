/**
 * Calculate the x and y coordinate of a point on a circle at a given angle.
 * @param {*} centerX of the circle
 * @param {*} centerY of the circle
 * @param {*} radius of the circle
 * @param {*} angleInDegrees the point lies on
 * @returns Dict with x and y Coordinate
 */
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var rad = angleInDegrees * (Math.PI/180);
    return {
        x: centerX + radius * Math.cos(rad),
        y: centerY + radius * Math.sin(rad)
    };
}

/**
 * Create a svg path showing part of a Annulus.
 * @param {*} x Coordinate of the Center Point of the Circle
 * @param {*} y Coordinate of the Center Point of the Circle
 * @param {*} radius of the outer circle (inner circle will be 0.8 of it)
 * @param {*} startAngle Angle to start the part of the Annulus
 * @param {*} endAngle Angle to end the part of the Annulus
 * @returns svg path as a String
 */
function describeArc(x, y, radius, startAngle, endAngle){
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
      
    var radius_inner = radius * 0.8;
    var end_inner = polarToCartesian(x, y, radius_inner, endAngle);
    var start_inner = polarToCartesian(x, y, radius_inner, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", start_inner.x, start_inner.y,
        "A", radius_inner, radius_inner, 0, largeArcFlag, 1, end_inner.x, end_inner.y,
        "L", start.x, start.y
    ].join(" ");
}

centerX = 150;
centerY = 150;
radius = 100;

window.onload = function() {
    document.getElementById("arc1").setAttribute("d", describeArc(centerX, centerY, radius, 90, 140));
    document.getElementById("arc2").setAttribute("d", describeArc(centerX, centerY, radius, 145, 195));
    document.getElementById("arc3").setAttribute("d", describeArc(centerX, centerY, radius, 200, 250));
    document.getElementById("arc4").setAttribute("d", describeArc(centerX, centerY, radius, 255, 305));
    document.getElementById("arc5").setAttribute("d", describeArc(centerX, centerY, radius, 310, 360));
};
  