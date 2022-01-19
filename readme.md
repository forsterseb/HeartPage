# What is this project about?
Read the Heartbeat from an arduino.  
Display it to a webpage, so it can be included in OBS.

# What you need
## Hardware
| Name | Quantity |
| --- | --- |
Arduino | 1
Breadboard | 1
Connecting wires | 5
ECG sensor | 1

## Software
Python 3
# Setup 
## Hardware
For the Hardware part follow this guide.

https://how2electronics.com/ecg-monitoring-with-ad8232-ecg-sensor-arduino/

## Installation
```bash
pip install -r requirements.txt
```

## Start reading from Arduino and webpage
```bash
flask run
```
## Display page in obs
Default URL for the page is `http://localhost:5000/index.html`
In OBS add this URL as a new Source -> Browser.

## Use OBS as cam
https://obsproject.com/forum/resources/obs-virtualcam.949/