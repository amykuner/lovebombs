const model = require("../database/model.js");
const layout = require("../layout");

function pageContent(obj, commentList) {
  return `
    <header>
        <h1> Hello ${obj.full_name}</h1>
    </header>
    <main>
        <section>
            <img src='${obj.img_url}' alt='facmember ${obj.full_name} image'>
        </section>
        <section>
            <form action='/facmember/:${obj.full_name}'  method='POST'>
                <p>
                <label for="text_content"> Leave your compliment! </label>
                <input type="textarea" name= "text_content" id="text_content" required>
                </p>
                <p>
                <label for="username">Nickname</label>
                <input name="username" id="username" required>
                </p>
                <button type="submit">Post</button>

            </form>
        </section>
        <section>
            <ul>
                ${commentList}
            </ul>
        </section>

    </main>
    `;
}

function get(request, response) {
  try {
    const name = request.params.name;
    console.log(name);
    const html = layout(`With Compliments | ${name}`, pageContent(name));
    model.getFacMemberDetails(name).then((results) => {
      console.log(results);
    });
    model.getComments(name).then((results) => {
      console.log(results);
    });
    response.send(html);
  } catch (error) {
    console.error(error);
    response.status(500).send(`<h1>Server error</h1>`);
  }
}

function post(request, response) {
  response.send("<h1>Hello!</h1>");
}

module.exports = { get, post };
