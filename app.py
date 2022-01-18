from flask import Flask, render_template, redirect
from pulse import block_and_calc_bpm, get_BPMs

app = Flask(__name__)

@app.route('/')
def base():
    return redirect("/index.html", code=302)

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/api/pulse', methods=['GET'])
def pulse2():
    return get_BPMs()

# start background thread that reads from sensor and calculates the bpm
from threading import Thread
flask_task = Thread(target=block_and_calc_bpm)
flask_task.daemon = True
flask_task.start()