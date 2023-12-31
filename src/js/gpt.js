import { Configuration, OpenAIApi } from "openai";
import { config } from "./keys";
const configuration = new Configuration(config);

jQuery(".summary_generate").on("click", async function (e) {
  e.preventDefault();
  if (!jQuery(".resume_form")[0].checkValidity()) {
    jQuery(".resume_form")[0].reportValidity();
    return;
  }
  jQuery(".summary_generate").text("Generating ...");
  const name = jQuery("input[name=name]").val();
  const job = jQuery("input[name=job]").val();
  const languages = jQuery("input[name=languages]").val();
  const yearsexp = jQuery("input[name=yearsexp]").val();

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `
        name : ${name}
        job : ${job}
        languages : ${languages}
        years on this field : ${yearsexp}
    
        from this data create a summary as first person for a cv 
        text only
        `,
      },
    ],
    n: 1,
    temperature: 1,
    max_tokens: 300,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const summary = response.data.choices[0].message.content.trim();
  jQuery(".summary_generate").hide();
  jQuery(".resume_generate").show();
  jQuery("textarea[name=summary]").val(summary);
});
