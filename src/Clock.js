import React, {Component} from 'react';
import './Clock.css';

class Clock extends Component {

    drawArrow = function(canvas, x, y, width, startX, startY) {
        canvas.beginPath()
        canvas.moveTo(startX, startY)
        canvas.lineTo(x, y)
        canvas.lineWidth = width
        canvas.strokeStyle = this.props.color
        canvas.stroke()
    }

    drawArrows = function(canvas){
        var hours = this.time.date.getHours()
        // Fix AM/PM
        if (hours > 12) {
            hours -= 12
        } else if (hours === 0) {
            hours = 12
        }
        hours += this.time.date.getMinutes() / 60
        let startX = this.props.width / 2
        let startY =  this.props.height / 2
        let circleRadius = this.props.height / 2 - 20
        let secondLength = circleRadius -  this.props.width / 20 * 2
        let minuteLength = circleRadius -  this.props.width / 20 * 3
        let hourLength = circleRadius -  this.props.width / 20 * 4

        let MP60 = (2 * Math.PI / 60);
        let MP12 = (2 * Math.PI /12);
        let sec =  this.time.date.getSeconds();
        let min = this.time.date.getMinutes();

        let Sx = startX + secondLength * -Math.sin((MP60 * sec + Math.PI));
        let Sy = startY + secondLength * Math.cos((MP60 * sec + Math.PI));
        let Mx = startX + minuteLength * -Math.sin((MP60 * min + Math.PI));
        let My = startY + minuteLength * Math.cos((MP60 * min + Math.PI));
        let Hx = startX + hourLength * -Math.sin((MP12 * hours + Math.PI));
        let Hy = startY + hourLength * Math.cos(MP12 * hours + Math.PI);

        this.drawArrow(canvas, Sx, Sy, this.props.secondWidth, startX, startY)
        this.drawArrow(canvas, Mx, My, this.props.minuteWidth, startX, startY)
        this.drawArrow(canvas, Hx, Hy, this.props.hourWidth, startX, startY)
    }

    drawClock = function(){
        this.time = { date : new Date() };
        var canvas = document.getElementById(this.props.id).getContext('2d');
        let startX = this.props.width / 2
        let startY =  this.props.height / 2
        let circleRadius =  this.props.height / 2 - 20
        let digitsLength = circleRadius - this.props.width / 20 * 1

        canvas.clearRect(0, 0,  this.props.width,  this.props.height)
        canvas.arc(startX, startY, 5, 0, 2 * Math.PI)
        canvas.fillStyle = this.props.color
        canvas.fill()
        canvas.beginPath()
        canvas.lineWidth = this.props.line
        canvas.strokeStyle = this.props.color
        canvas.arc(startX, startY, circleRadius, 0, 2 * Math.PI)
        canvas.stroke();
        this.drawArrows(canvas);
        for (var i = 12; i > 0; i--) {
            var angle = (2 * Math.PI / 12) * i + Math.PI
            var x = startX - 4 + digitsLength * -Math.sin(angle);
            var y = startY + 4 + digitsLength * Math.cos(angle);
            canvas.fillText(i, x, y);
        }
    }

    render() {
        return (
            <canvas id={this.props.id} color={this.props.color} width={this.props.width} height={this.props.height}></canvas>
        );
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.drawClock(),
            1000
        );
    }
}

Clock.defaultProps = {
    'color': "#168A27",
    'width': 400,
    'height': 400,
    'line': 6,
    'id': 'clock',
    'secondWidth': 2,
    'minuteWidth': 4,
    'hourWidth': 8
}

export default Clock
