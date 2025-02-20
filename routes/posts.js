const model = require("../database/model.js");
const layout = require("../layout");

function pageContent(obj, commentList) {
  //console.log(obj.full_name);
  return `
    <header>
        <h1> Hello ${obj.full_name}</h1>
    </header>
    <main>
        <section>
            <img src='${obj.img_url}' alt='facmember ${obj.full_name} image'>
        </section>
        <section>
            <form action='/facmembers/${obj.full_name}'  method='POST'>
                <p>
                <label for="text_content"> Leave your compliment! </label>
                <input type="textarea" name= "text_content" id="text_content" required>
                </p>
                <button type="submit">Post</button>

            </form>
        </section>
    </main>
    `;
}

function createListComment(comments) {
  return comments
    .map((comment) => {
      let commentArray = Object.values(comment);
      return `
    <div>
        <p>${commentArray[0]}</p>
        <p>${commentArray[1]}</p>
        <p>${commentArray[3]}</p>
    </div>
    `;
    })
    .join("");
}

function get(request, response) {
  try{
    const name = request.params.name;
    model.getFacMemberDetails(name)
    .then((obj) => {
    return layout(
      `With Compliments | ${name}`,
     pageContent(obj[0])
    )})
    .then((html) => response.send(html));
  } catch (error) {
    console.error(error);
    response.status(500).send(`<h1>Server error</h1>`);
  }
}

function post(request, response) {
  const urlName = request.originalUrl.replace("/facmembers/", "");
  const data = Object.values(request.body);
  model
    .getFacMemberDetails(urlName)
    .then((result) => result[0].id)
    .then((id) => model.addComments([2, id, data[0]]))
    .then((result) => {
      response.redirect(`/facmembers/${urlName}`);
    });
}



module.exports = { get, post };
