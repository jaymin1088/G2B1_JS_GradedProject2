let datas;
let front = 1;
let buttonfirst;
let btn;
let z = 1;
let array = []; // for storing filtered json data

let input = document.querySelector(".filterbox");
input.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    $(document).ready(function () {
      $.getJSON("../other/Data.json", function (data) {
        document.getElementById("prev").style.visibility = "visible";
        document.getElementById("next").style.visibility = "visible";
        document.querySelector(".errorpage").style.display = "none";
        document.querySelector(".resumebox").style.display = "grid";
        z = 1;
        btn = null;
        let arr = [];
        let k = 0;
        for (i = 0; i <= 5; i++) {
          if (data.resume[i].basics.AppliedFor.toLowerCase() == input.value.toLowerCase()) {
            arr[k] = i;
            k++;
          }
        }

        if (k == 1) {
          document.getElementById("prev").style.visibility = "hidden";
          document.getElementById("next").style.visibility = "hidden";
          displayfilter(data, arr[0]);
        } else if (k >= 2) {
          document.getElementById("prev").style.visibility = "hidden";
          displayfilter(data, arr[0]);
        } else {
          document.querySelector(".errorpage").style.display = "flex";
          document.querySelector(".resumebox").style.display = "none";
          document.getElementById("prev").style.visibility = "hidden";
          document.getElementById("next").style.visibility = "hidden";
        }

        array = arr;
      });
    });
  }
});

$(document).ready(function () {
  $.getJSON("../other/Data.json", function (data) {
    document.querySelector(".errorpage").style.display = "none";
    datas = data;
    display(datas, 0);
  });
});

function forward() {
  console.log("z for front=" + z);

  if (btn == "r") {
    z = z + 2;
  }

  console.log("z for front=" + z);

  btn = "f";
  if (array[z] != undefined) {
    document.getElementById("prev").style.visibility = "visible";

    if (z == array.length - 1)
      document.getElementById("next").style.visibility = "hidden";

    displayfilter(datas, array[z]);
    z++;
  } else {
    var child = achievelist.lastElementChild;
    while (child) {
      achievelist.removeChild(child);
      child = achievelist.lastElementChild;
    }

    var child = hobbieslist.lastElementChild;
    while (child) {
      hobbieslist.removeChild(child);
      child = hobbieslist.lastElementChild;
    }

    var child = techlist.lastElementChild;
    while (child) {
      techlist.removeChild(child);
      child = techlist.lastElementChild;
    }
    if (buttonfirst == "reverse" && front != 0) {
      front++;
    }

    buttonfirst = "forward";
    if (front <= 5 && front == 0) {
      front++;
      display(datas, front++);
    } else {
      display(datas, front++);
    }
  }
}

function back() {
  if (btn == "f") {
    z = z - 2;
  }

  btn = "r";

  if (array[z] != undefined) {
    document.getElementById("next").style.visibility = "visible";
    if (z == 0)
      document.getElementById("prev").style.visibility = "hidden";

    displayfilter(datas, array[z]);
    z--;
  } else {
    var child = achievelist.lastElementChild;
    while (child) {
      achievelist.removeChild(child);
      child = achievelist.lastElementChild;
    }

    var child = hobbieslist.lastElementChild;
    while (child) {
      hobbieslist.removeChild(child);
      child = hobbieslist.lastElementChild;
    }

    var child = techlist.lastElementChild;
    while (child) {
      techlist.removeChild(child);
      child = techlist.lastElementChild;
    }

    if (buttonfirst == "forward" && front != 5) {
      front--;
    }
    buttonfirst = "reverse";

    if (front > 0) {
      display(datas, --front);
    }
  }
}

function display(datas, k) {
  if (k == 0) {
    btn = (document.getElementById("prev").style.visibility = "hidden");
  } else if (k == 5) {
    btn = (document.getElementById("next").style.visibility = "hidden");
    front--;
  } else {
    btn = (document.getElementById("prev").style.visibility = "visible");
    btn = (document.getElementById("next").style.visibility = "visible");
  }

  let names = document.querySelector(".names");
  names.innerText = `${datas.resume[k].basics.name}`;
  let AppliedFor = document.querySelector(".AppliedFor");
  AppliedFor.innerText = `${datas.resume[k].basics.AppliedFor}`;

  let phone = document.querySelector(".phone");
  phone.innerText = `${datas.resume[k].basics.phone}`;

  let email = document.querySelector(".email");
  email.innerText = `${datas.resume[k].basics.email}`;

  document.querySelector(".link").href = `${datas.resume[k].basics.profiles.url}`;

  for (i = 1; i <= datas.resume[k].skills.keywords.length; i++) {
    techlist = document.querySelector(".tech");
    let p = document.createElement("p");
    p.innerText = `${datas.resume[k].skills.keywords[i - 1]}`;
    techlist.appendChild(p);
  }

  for (i = 1; i <= datas.resume[k].interests.hobbies.length; i++) {
    hobbieslist = document.querySelector(".hobbies");
    let p = document.createElement("p");
    p.innerText = `${datas.resume[k].interests.hobbies[i - 1]}`;
    hobbieslist.appendChild(p);
  }


  let company = document.querySelector(".company");
  company.innerText = `${datas.resume[k].work.Company}`;

  let position = document.querySelector(".workingpostion");
  position.innerText = `${datas.resume[k].work.Position}`;

  let startdate = document.querySelector(".sd");
  startdate.innerText = `${datas.resume[k].work["Start Date"]}`;

  let enddate = document.querySelector(".ed");
  enddate.innerText = `${datas.resume[k].work["End Date"]}`;

  let summary = document.querySelector(".worksummary");
  summary.innerText = `${datas.resume[k].work.Summary}`;

  let projectname = document.querySelector(".projectname");
  projectname.innerText = `${datas.resume[k].projects.name}:`;

  let description = document.querySelector(".description");
  description.innerText = `${datas.resume[k].projects.description}:`;

  let ug = document.querySelector(".ug");
  ug.innerText = `${datas.resume[k].education.UG.institute},${
    datas.resume[k].education.UG.course
  },${datas.resume[k].education.UG["Start Date"]},${
    datas.resume[k].education.UG["End Date"]
  },${datas.resume[k].education.UG.cgpa}`;

  let pu = document.querySelector(".pu");
  pu.innerText = `${datas.resume[k].education["Senior Secondary"].institute},${
    datas.resume[k].education["Senior Secondary"].cgpa
  }`;

  let school = document.querySelector(".school");
  school.innerText = `${datas.resume[k].education["High School"].institute},${
    datas.resume[k].education["High School"].cgpa
  }`;

  let intern_company = document.querySelector(".intercompany");
  intern_company.innerText = `${datas.resume[k].Internship.intern_company}`;

  let intern_postion = document.querySelector(".intern_postion");
  intern_postion.innerText = `${datas.resume[k].Internship.Position}`;

  let intern_startdate = document.querySelector(".intern_startdate");
  intern_startdate.innerText = `${datas.resume[k].Internship["Start Date"]}`;

  let intern_enddate = document.querySelector(".intern_enddate");
  intern_enddate.innerText = `${datas.resume[k].Internship["End Date"]}`;

  let intern_summary = document.querySelector(".intern_summary");
  intern_summary.innerText = `${datas.resume[k].Internship.Summary}`;

  for (i = 1; i <= datas.resume[k].achievements.Summary.length; i++) {
    achievelist = document.querySelector(".achievements");
    let li = document.createElement("li");
    li.innerText = `${datas.resume[k].achievements.Summary[i - 1]}`;
    achievelist.appendChild(li);
  }
}

function displayfilter(data, k) {
  var child = achievelist.lastElementChild;
  while (child) {
    achievelist.removeChild(child);
    child = achievelist.lastElementChild;
  }

  var child = hobbieslist.lastElementChild;
  while (child) {
    hobbieslist.removeChild(child);
    child = hobbieslist.lastElementChild;
  }

  var child = techlist.lastElementChild;
  while (child) {
    techlist.removeChild(child);
    child = techlist.lastElementChild;
  }

  let names = document.querySelector(".names");
  names.innerText = `${data.resume[k].basics.name}`;
  let AppliedFor = document.querySelector(".AppliedFor");
  AppliedFor.innerText = `${data.resume[k].basics.AppliedFor}`;

  let phone = document.querySelector(".phone");
  phone.innerText = `${data.resume[k].basics.phone}`;

  let email = document.querySelector(".email");
  email.innerText = `${data.resume[k].basics.email}`;

  document.querySelector(".link").href = `${data.resume[k].basics.profiles.url}`;

  for (i = 1; i <= data.resume[k].skills.keywords.length; i++) {
    techlist = document.querySelector(".tech");
    let p = document.createElement("p");
    p.innerText = `${data.resume[k].skills.keywords[i - 1]}`;
    techlist.appendChild(p);
  }

  for (i = 1; i <= data.resume[k].interests.hobbies.length; i++) {
    hobbieslist = document.querySelector(".hobbies");
    let p = document.createElement("p");
    p.innerText = `${data.resume[k].interests.hobbies[i - 1]}`;
    hobbieslist.appendChild(p);
  }

  let company = document.querySelector(".company");
  company.innerText = `${data.resume[k].work["company name"]}`;

  let position = document.querySelector(".workingpostion");
  position.innerText = `${data.resume[k].work.Position}`;

  let startdate = document.querySelector(".sd");
  startdate.innerText = `${data.resume[k].work["Start Date"]}`;

  let enddate = document.querySelector(".ed");
  enddate.innerText = `${data.resume[k].work["End Date"]}`;

  let summary = document.querySelector(".worksummary");
  summary.innerText = `${data.resume[k].work.Summary}`;

  let projectname = document.querySelector(".projectname");
  projectname.innerText = `${data.resume[k].projects.name}:`;

  let description = document.querySelector(".description");
  description.innerText = `${data.resume[k].projects.description}:`;

  let ug = document.querySelector(".ug");
  ug.innerText = `${data.resume[k].education.UG.institute},${
    data.resume[k].education.UG.course
  },${data.resume[k].education.UG["Start Date"]},${
    data.resume[k].education.UG["End Date"]
  },${data.resume[k].education.UG.cgpa}`;

  let pu = document.querySelector(".pu");
  pu.innerText = `${data.resume[k].education["Senior Secondary"].institute},${
    data.resume[k].education["Senior Secondary"].cgpa
  }`;

  let school = document.querySelector(".school");
  school.innerText = `${data.resume[k].education["High School"].institute},${
    data.resume[k].education["High School"].cgpa
  }`;

  let intern_company = document.querySelector(".intern_company");
  intern_company.innerText = `${data.resume[k].Internship["company name"]}`;

  let intern_postion = document.querySelector(".intern_postion");
  intern_postion.innerText = `${data.resume[k].Internship.Position}`;

  let intern_startdate = document.querySelector(".intern_startdate");
  intern_startdate.innerText = `${data.resume[k].Internship["Start Date"]}`;

  let intern_enddate = document.querySelector(".intern_enddate");
  intern_enddate.innerText = `${data.resume[k].Internship["End Date"]}`;

  let intern_summary = document.querySelector(".intern_summary");
  intern_summary.innerText = `${data.resume[k].Internship.Summary}`;

  for (i = 1; i <= data.resume[k].achievements.Summary.length; i++) {
    achievelist = document.querySelector(".achievements");
    let li = document.createElement("li");
    li.innerText = `${data.resume[k].achievements.Summary[i - 1]}`;
    achievelist.appendChild(li);
  }
}