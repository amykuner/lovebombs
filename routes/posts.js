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
            <form action='/facmembers/:${obj.full_name}'  method='POST'>
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

async function get(request, response) {
  try {
    const name = request.params.name;
    // console.log(name);
    // const html = layout(`With Compliments | ${name}`, pageContent(name));
    // model.getFacMemberDetails(name).then((results) => {
    //   console.log(results);
    // });
    // model.getComments(name).then((results) => {
    //   console.log(results);
    // });

    const obj = await model.getFacMemberDetails(name);
    const commentList = await model.getComments(name);

    console.log(obj, commentList);
    const html = layout(
      `With Compliments | ${name}`,
      pageContent(obj[0], createListComment(commentList))
    );

    response.send(html);
  } catch (error) {
    console.error(error);
    response.status(500).send(`<h1>Server error</h1>`);
  }
}

function post(request, response) {
  const urlName = request.originalUrl.replace("/facmembers/","");
  let data = Object.values(request.body);
  // let newArray = [...2, , ...data[0]];
  // data.

  model.addComments(data).then((result) => {
    console.log(result);
    response.redirect(`/facmembers/${urlName}`);
  })

  //user_id, fac_member_id, text_content, created_at;
  //console.log(urlName, data

//   console.log(data)

}



module.exports = { get, post };
