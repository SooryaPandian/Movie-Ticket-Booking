f  rom flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="soorya",
    database="movie_booking"
)
cursor = db.cursor()

@app.route('/api/seats', methods=['GET'])
def get_seats():
    cursor.execute("SELECT * FROM seats")
    result = cursor.fetchall()
    seats = [[seat[2] for seat in result[i:i + 30]] for i in range(0, len(result), 30)]
    return jsonify(seats)

@app.route('/api/select-seat', methods=['POST'])
def select_seat():
    data = request.json
    row = data.get('row')
    seat = data.get('seat')

    cursor.execute("SELECT status FROM seats WHERE row=%s AND seat_number=%s", (row, seat))
    seat_status = cursor.fetchone()

    if seat_status and seat_status[0] == 'free':
        cursor.execute("UPDATE seats SET status='pending' WHERE row=%s AND seat_number=%s", (row, seat))
        db.commit()
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Seat not available"}), 400

if __name__ == '__main__':
    app.run(debug=True)
