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

# variables for graphs
raw_BPMs = []
MAX_RAW_BPM = 500
hist_BPMs = []
MAX_HIST_BPM = 50

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
            log_raw_value(value)
            if value > threshold and below_threshold:
                bpm()
                below_threshold = False
            elif value < threshold:
                below_threshold = True
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
    log_hist_bpm(current_BPM)
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

def get_raw_bpm_data():
    return raw_BPMs

def get_hist_bpm():
    return hist_BPMs

def block_and_calc_bpm():
    """Runs through the values in the pulse_generator so the generator keeps reading from serial and calculating bpm."""
    for _ in get_pulse_generator():
        pass

def log_raw_value(value):
    raw_BPMs.append(value)
    if len(raw_BPMs) > MAX_RAW_BPM:
        raw_BPMs.pop(0)

def log_hist_bpm(bpm):
    hist_BPMs.append(bpm)
    if len(hist_BPMs) > MAX_HIST_BPM:
        hist_BPMs.pop(0)

if __name__ == '__main__':
    block_and_calc_bpm()