from flask import Flask, render_template, request, redirect, url_for, session 
import json
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = "your_secret_key"

app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "Cycle123@"
app.config["MYSQL_DB"] = "familyfashion"

mysql = MySQL(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/shop")
def shop():
    return render_template("shop.html")

@app.route("/wishlist")
def wishlist():
    return render_template("wishlist.html")

@app.route("/cart")
def cart():
    return render_template("cart.html")

@app.route("/kids")
def kids():
    return render_template("kids.html")

@app.route("/women")
def women():
    return render_template("women.html")

@app.route("/men")
def men():
    return render_template("men.html")

@app.route("/accessories")
def accessories():
    return render_template("accessories.html")

@app.route("/sale")
def sale():
    return render_template("sale.html")

@app.route("/newborn")
def newborn():
    return render_template("newborn.html")

@app.route("/babygirl")
def babygirl():
    return render_template("babygirl.html")

@app.route("/babyboy")
def babyboy():
    return render_template("babyboy.html")

@app.route("/w_tshirts")
def wtshirts():
    return render_template("w t-shirts.html")

@app.route("/w_jeans")
def wjeans():
    return render_template("w jeans.html")

@app.route("/tops")
def tops():
    return render_template("tops.html")

@app.route("/skirts")
def skirts():
    return render_template("skirts.html")

@app.route("/ethnic_wear")
def ethnicwear():
    return render_template("ethnic.html")

@app.route('/m_tshirts')
def m_tshirts():
    return render_template('m t-shirts.html')

@app.route('/m_jeans')
def m_jeans():
    return render_template('m jeans.html')

@app.route('/shirts')
def shirts():
    return render_template('shirts.html')

@app.route('/pants')
def pants():
    return render_template('pants.html')

@app.route('/trackpants')
def trackpants():
    return render_template('trackpants.html')

@app.route('/caps')
def caps():
    return render_template('caps.html')

@app.route('/bags')
def bags():
    return render_template('bags.html')

@app.route('/watches')
def watches():
    return render_template('watches.html')

@app.route('/sunglasses')
def sunglasses():
    return render_template('sunglasses.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/shopping policy')
def shopping_policy():
    return render_template('shopping policy.html')

@app.route('/returns-refunds')
def returns_refunds():
    return render_template('returns-refunds.html')

@app.route("/signup", methods=["POST"])
def signup():

    fullname = request.form["fullname"]
    email = request.form["email"]
    password = request.form["password"]
    confirm = request.form["confirm_password"]

    if password != confirm:
        return "Passwords do not match"

    cursor = mysql.connection.cursor()

    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        return "Email already registered"

    hashed_password = generate_password_hash(password)

    cursor.execute(
        "INSERT INTO users(fullname,email,password) VALUES(%s,%s,%s)",
        (fullname, email, hashed_password)
    )

    mysql.connection.commit()
    cursor.close()

    return redirect(url_for("index"))

@app.route("/login", methods=["POST"])
def login():

    email = request.form["email"]
    password = request.form["password"]

    cursor = mysql.connection.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=%s",
        (email,)
    )

    user = cursor.fetchone()

    cursor.close()

    if user and check_password_hash(user[3], password):

        session["user_id"] = user[0]
        session["user_name"] = user[1]

        return redirect(url_for("index"))

    return "Invalid Email or Password"

@app.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("index"))

@app.route("/account")
def account():

    cursor = mysql.connection.cursor()

    cursor.execute(
        "SELECT email FROM users WHERE id=%s",
        (session["user_id"],)
    )

    email = cursor.fetchone()[0]

    cursor.close()

    return render_template("account.html", email=email)

@app.route("/settings")
def settings():
    return render_template("settings.html")

@app.route("/update_name", methods=["POST"])
def update_name():

    new_name = request.form["fullname"]

    cursor = mysql.connection.cursor()

    cursor.execute(
        "UPDATE users SET fullname=%s WHERE id=%s",
        (new_name, session["user_id"])
    )

    mysql.connection.commit()
    cursor.close()

    session["user_name"] = new_name

    return redirect(url_for("settings"))

@app.route("/update_email", methods=["POST"])
def update_email():

    new_email = request.form["email"]

    cursor = mysql.connection.cursor()

    cursor.execute(
        "UPDATE users SET email=%s WHERE id=%s",
        (new_email, session["user_id"])
    )

    mysql.connection.commit()
    cursor.close()

    return redirect(url_for("settings"))

@app.route("/delete_account", methods=["POST"])
def delete_account():

    cursor = mysql.connection.cursor()

    cursor.execute(
        "DELETE FROM users WHERE id=%s",
        (session["user_id"],)
    )

    mysql.connection.commit()
    cursor.close()

    session.clear()

    return redirect(url_for("index"))

@app.route("/orders")
def orders():

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT o.id,
               o.order_date,
               o.total,
               o.status,
               oi.image,
               oi.product_name,
               oi.price,
               oi.quantity
        FROM orders o
        JOIN order_items oi
        ON o.id = oi.order_id
        WHERE o.user_id=%s
        ORDER BY o.id DESC
    """, (session["user_id"],))

    rows = cursor.fetchall()
    cursor.close()

    orders = {}

    for row in rows:

        order_id = row[0]

        if order_id not in orders:
            orders[order_id] = {
                "date": row[1],
                "total": row[2],
                "status": row[3],
                "items": []
            }

        orders[order_id]["items"].append({
            "image": row[4],
            "name": row[5],
            "price": row[6],
            "quantity": row[7]
        })

    return render_template("orders.html", orders=orders)



@app.route("/payment", methods=["POST"])
def payment():
    cart_data = request.form["cart_data"]
    return render_template("payment.html", cart_data=cart_data)

@app.route("/place_order", methods=["POST"])
def place_order():

    payment_method = request.form["payment"]

    user_id = session["user_id"]

    cart = json.loads(request.form["cart_data"])

    total = sum(
    item["price"] * item.get("quantity", 1)
    for item in cart
)

    cursor = mysql.connection.cursor()

    cursor.execute("""
        INSERT INTO orders(user_id,total,status)
        VALUES(%s,%s,%s)
    """,(user_id,total,"Pending"))

    mysql.connection.commit()

    order_id = cursor.lastrowid

    for item in cart:

        cursor.execute("""
    INSERT INTO order_items
    (order_id,user_id,product_name,quantity,price,status,image)
    VALUES(%s,%s,%s,%s,%s,%s,%s)
""",(
    order_id,
    user_id,
    item["name"],
    item.get("quantity", 1),
    item["price"],
    "Pending",
    item["image"]
))

    mysql.connection.commit()
    cursor.close()

    return render_template("order_success.html")

if __name__ == "__main__":
    app.run(debug=True)