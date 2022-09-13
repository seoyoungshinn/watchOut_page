from urllib import request
from flask import Flask,render_template
from flask import redirect
app = Flask(__name__)
    
@app.route('/')
def welcome():
    return render_template('ff/login.html')

@app.route('/menupage')
def menupage():
    return render_template('menuPage.html')    

@app.route('/teamInfo')
def teamInfo():
    return render_template('teamInfo.html')

@app.route('/appInfo')
def appInfo():
    return render_template('appInfo.html')

@app.route('/webInfo')
def webInfo():
    return render_template('webInfo.html')

@app.route('/watchnow')
def watchnow():
    return render_template('watchnow.html')

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/analysis')
def analysis():
    return render_template('analysis.html')

@app.route('/bootmap')
def boot():
    return render_template('ex/bootmap.html')

@app.route('/favorites')
def favorites():
    return render_template('favorites.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/simulation')
def simulation():
    return render_template('simulation.html')

@app.route('/assess')
def assess():
    return render_template('assess.html')

@app.route('/feedback')
def feedback():
    return render_template('ff/feedback.html')

@app.route('/preference')
def preference():
    return render_template('ff/preference.html')

@app.route('/json')
def json():
    return render_template('ex/json.html')

@app.route('/exhistory')
def exhistory():
    return render_template('ex/exhistory.html')

@app.route('/watchinfo')
def routeinfo():
    return render_template('ff/watchinfo.html')

@app.route('/watchfour')
def viewfour():
    return render_template('ff/watchfour.html')
    
if __name__ == '__main__':
    app.run(host="0.0.0.0", post="5000")

