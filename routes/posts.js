const model = require("../database/model.js");
const layout = require("../layout");

function pageContent(obj) {
  return `
    <header>
        <h1>${obj.full_name}</h1>
    </header>
    <main>
        <section>
            <img src='${obj.img_url}' alt='facmember ${obj.full_name} image'>
        </section>
        <section>
            <form>
                <label></label>
                <input>
                <label>user</label>
                <input>
            </form>
        </section>
    </main>
    `;
}

function get(request, response) {
  try {
    const name = request.params.name;
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
