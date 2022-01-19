from flask import Flask, render_template, redirect, jsonify
from pulse import block_and_calc_bpm, get_BPMs, get_hist_bpm, get_raw_bpm_data

app = Flask(__name__)

################
## Page-Calls ##
################
@app.route('/')
def base():
    return redirect("/index.html", code=302)

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/raw_data.html')
def rd_graph():
    return render_template('raw_data.html')

@app.route('/hist_bpm.html')
def hb_graph():
    return render_template('hist_bpm.html')

#################
## API-Methods ##
#################
@app.route('/api/pulse', methods=['GET'])
def pulse2():
    return get_BPMs()

@app.route('/api/raw_data', methods=['GET'])
def get_raw_data():
    return jsonify(get_raw_bpm_data())

@app.route('/api/hist_bpm', methods=['GET'])
def get_hb():
    return jsonify(get_hist_bpm())

# start background thread that reads from sensor and calculates the bpm
from threading import Thread
flask_task = Thread(target=block_and_calc_bpm)
flask_task.daemon = True
flask_task.start()