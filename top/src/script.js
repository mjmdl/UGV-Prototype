const DB_PATH = "src/db.json"
let IGNORE_COURSE = false;

let challenge_answer;

function load_courses(select)
{
    if (IGNORE_COURSE)
        return;
    fetch(DB_PATH)
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            let courses = data.courses;
            for (i = 0; i < courses.length; i++)
            {
                let o = document.createElement("option");
                o.value = courses[i].value;
                o.innerText = courses[i].name;
                select.appendChild(o);
            } 
        });
}

function generate_challenge(challenge)
{
    let fst = (Math.random() * 10).toFixed();
    let snd = (Math.random() * 10).toFixed();
    challenge_answer = parseInt(fst) + parseInt(snd);

    challenge.innerText = fst + " + " + snd + " = ?";
}

function verify_form(e, name, email, birth, cpf, city, course, phone, challenge)
{
    let fail = false;

    if (name.value.length < 7)
    {
        document.getElementById("form_name_alert").removeAttribute("hidden");
        fail = true;
    }
    else
    {
        document.getElementById("form_name_alert").setAttribute("hidden", "true");
    }
    
    if (!new RegExp(email.getAttribute("pattern")).test(email.value))
    {
        document.getElementById("form_email_alert").removeAttribute("hidden");
        fail = true;
    }
    else
    {
        document.getElementById("form_email_alert").setAttribute("hidden", "true");
    }

    if (!birth.value)
    {
        document.getElementById("form_birth_alert").removeAttribute("hidden");
        fail = true;
    }
    else
    {
        document.getElementById("form_birth_alert").setAttribute("hidden", "true");
    }

    if (!new RegExp(cpf.getAttribute("pattern")).test(cpf.value))
    {
        document.getElementById("form_cpf_alert").removeAttribute("hidden");
        fail = true;
    }
    else
    {
        document.getElementById("form_cpf_alert").setAttribute("hidden", "true");
    }

    if (!city.value)
    {
        document.getElementById("form_city_alert").removeAttribute("hidden");
        fail = true;
    }
    else
    {
        document.getElementById("form_city_alert").setAttribute("hidden", "true");
    }

    if (!IGNORE_COURSE && (course.value == "none" || !course.value))
    {
        document.getElementById("form_course_alert").removeAttribute("hidden");
        fail = true;
    }
    else
    {
        document.getElementById("form_course_alert").setAttribute("hidden", "true");
    }

    if (phone.value.length < 10)
    {
        document.getElementById("form_phone_alert").removeAttribute("hidden");
        fail = true;
    }
    else
    {
        document.getElementById("form_phone_alert").setAttribute("hidden", "true");
    }
    
    if (parseInt(challenge.value) != challenge_answer)
    {
        document.getElementById("form_challenge_alert").removeAttribute("hidden");
        fail = true;
    }
    else
    {
        document.getElementById("form_challenge_alert").setAttribute("hidden", "true");
    }
    
    if (fail)
    {
        e.preventDefault();
    }

    return !fail;
}

function submit_form(e, form)
{
    document.getElementById("form_submit_alert").removeAttribute("hidden");
    confirm("Formulário enviado com sucesso!");
}