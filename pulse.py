from distutils.log import error
from typing import Dict
import serial
import time

# to list all ports https://stackoverflow.com/questions/12090503/listing-available-com-ports-with-python

MAX_BEATS = 3

threshold = 620
below_threshold = True

beats = []
beat_old = 0
BPM = 0
current_BPM = 0

def get_pulse_generator():
    try:
        ser = serial.Serial('COM3', 9600, timeout=1)
    except Exception as e:
        print(e)
        return

    while True:
        value = ser.readline().decode("UTF-8", errors="ignore").strip()
        if value and value != "!":
            global below_threshold, threshold
            value = int(value)
            if value != 0:
                pass
                #print(value)
            if value > threshold and below_threshold:
                bpm()
                print(value)
                below_threshold = False
            elif value < threshold:
                below_threshold = True

        #time.sleep(0.001)
        yield value

def bpm():
    """Calculate the BPM between the last two beats and the BPM over the last MAX_BEATS."""
    global beat_old, BPM, current_BPM
    beat_new = current_milli_time()
    diff = beat_new - beat_old
    beat_old = beat_new

    if diff == 0: return # if the same beet is evaluated twice
    c_BPM = 60000//diff
    if c_BPM > 250: return # check if BEAT is possible if not return
    current_BPM = c_BPM
    
    add_bpm_to_list(current_BPM)
    BPM = sum(beats)//len(beats)

    print(f"current_BPM {current_BPM}")
    print(f"all_bpm {BPM}")

def add_bpm_to_list(bpm):
    """Add a bpm to the list of all bpms and removes the oldest beats if the limit of beats is exceeded."""
    beats.append(bpm)
    if len(beats) > MAX_BEATS:
        beats.pop(0)

def current_milli_time() -> float:
    """Get the current time in ms."""
    return round(time.time() * 1000)

def get_BPMs() -> Dict:
    """Returns a Dict containing BPM and current_BPM."""
    global BPM, current_BPM
    return {'BPM': BPM, 'current_BPM': current_BPM}

def block_and_calc_bpm():
    """Runs through the values in the pulse_generator so the generator keeps reading from serial and calculating bpm."""
    for i in get_pulse_generator():
        pass

if __name__ == '__main__':
    block_and_calc_bpm()