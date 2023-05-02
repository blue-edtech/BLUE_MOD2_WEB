async function get_pokemons(page = 0,number = 1){
  const server = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${number}&offset=${page}`);
  const data = await server.json();

  data.results.forEach(async function(item) {

      const first_req = await fetch(item.url);
      const first_data = await first_req.json();

      const hp = `${first_data.stats[0].stat.name}: ${first_data.stats[0].base_stat}`;
      const attack = `${first_data.stats[1].stat.name}: ${first_data.stats[1].base_stat}`;
      const defence = `${first_data.stats[2].stat.name}: ${first_data.stats[2].base_stat}`;
      const special_attack = `${first_data.stats[3].stat.name}: ${first_data.stats[3].base_stat}`;
      const special_defense = `${first_data.stats[4].stat.name}: ${first_data.stats[4].base_stat}`;

      const name = first_data.name;
      const id = first_data.id;

      let evolution_name_first = "";
      let evolution_name_second = "";
      let evolution_name_third = "";
      let evolution_id_first = "";
      let evolution_id_second = "";
      let evolution_id_third = "";
      let valid_evolution_id_first = "";
      let valid_evolution_id_second = "";
      let valid_evolution_id_third = "";
      let evolution_image_first = "";
      let evolution_image_second = "";
      let evolution_image_third = "";
      let valid_evolution_image_first = "";
      let valid_evolution_image_second = "";
      let valid_evolution_image_third = "";

      try {
          const handle_species =  await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
          const convert_to_json = await handle_species.json();
          const species = convert_to_json.evolution_chain.url;
          const handle_evolution = await fetch(species);
          const evolution = await handle_evolution.json();

          if (id == 236){
              console.log(evolution.chain);
          }

          try{
              evolution_name_first = evolution.chain.species.name;
          } catch(e){
              evolution_name_first = "Not found";
          }
          try{
              evolution_name_second = evolution.chain.evolves_to[0].species.name;
          } catch(e){
              evolution_name_second = "Not found";
          }
          try{
              evolution_name_third = evolution.chain.evolves_to[0].evolves_to[0].species.name;
          } catch(e){
              evolution_name_third = "Not found";
          }
          try{
              evolution_id_first = evolution.chain.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('');
          } catch(e){
              evolution_id_first = "Not found";
          }
          try{
              evolution_id_second = evolution.chain.evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('');
          } catch(e){
              evolution_id_second = "Not found";
          }
          try{
              evolution_id_third = evolution.chain.evolves_to[0].evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('');
          } catch(e){
              evolution_id_third = "Not found";
          }
          valid_evolution_id_first = evolution_id_first == "" ? "Not found" : evolution_id_first;
          valid_evolution_id_second = evolution_id_second == "" ? "Not found" : evolution_id_second;
          valid_evolution_id_third = evolution_id_third == "" ? "Not found" : evolution_id_third;

          if (id != valid_evolution_id_first && id != valid_evolution_id_second && id != valid_evolution_id_third){
              for (let i = 1; i <= 8; i++){
                  try{
                      if (id == evolution.chain.evolves_to[i].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('')){
                          evolution_id_second = evolution.chain.evolves_to[i].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('');
                          evolution_name_second = evolution.chain.evolves_to[i].species.name
                      }
                  } catch(e){}
                  for (let f = 0; f <= 8; f++){
                      try{
                          if (id == evolution.chain.evolves_to[i].evolves_to[f].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('')){
                              evolution_id_third = evolution.chain.evolves_to[i].evolves_to[f].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('');
                              evolution_name_third = evolution.chain.evolves_to[i].evolves_to[f].species.name;
                          }
                      } catch(e){}
                  }
              }
          }
          valid_evolution_id_first = evolution_id_first == "" ? "Not found" : evolution_id_first;
          valid_evolution_id_second = evolution_id_second == "" ? "Not found" : evolution_id_second;
          valid_evolution_id_third = evolution_id_third == "" ? "Not found" : evolution_id_third;

          evolution_image_first = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution_id_first}.png`;
          evolution_image_second = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution_id_second}.png`;
          evolution_image_third = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution_id_third}.png`;
          valid_evolution_image_first = valid_evolution_id_first == "Not found" ? "./assets/images/noImage.jpg" : evolution_image_first;
          valid_evolution_image_second = valid_evolution_id_second == "Not found" ? "./assets/images/noImage.jpg" : evolution_image_second;
          valid_evolution_image_third = valid_evolution_id_third == "Not found" ? "./assets/images/noImage.jpg" : evolution_image_third;
      } 
      catch(e){
          valid_evolution_id_first = evolution_id_first == "" ? "Not found" : evolution_id_first;
          valid_evolution_id_second = evolution_id_second == "" ? "Not found" : evolution_id_second;
          valid_evolution_id_third = evolution_id_third == "" ? "Not found" : evolution_id_third;

          evolution_image_first = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution_id_first}.png`;
          evolution_image_second = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution_id_second}.png`;
          evolution_image_third = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution_id_third}.png`;
          valid_evolution_image_first = valid_evolution_id_first == "Not found" ? "./assets/images/noImage.jpg" : evolution_image_first;
          valid_evolution_image_second = valid_evolution_id_second == "Not found" ? "./assets/images/noImage.jpg" : evolution_image_second;
          valid_evolution_image_third = valid_evolution_id_third == "Not found" ? "./assets/images/noImage.jpg" : evolution_image_third;
      }

      let image = "";

      if (first_data.sprites.other["official-artwork"].front_default == null){
          image = "./assets/images/noImage.jpg";
      } else {
          image = first_data.sprites.other["official-artwork"].front_default;
      }
      
      const second_req = await fetch(first_data.species.url);
      const second_data = await second_req.json();

      let description = "";

      for (let i = 0; i <= 500; i++){
          if (second_data.flavor_text_entries[i].language.name == "en"){

              description = second_data.flavor_text_entries[i].flavor_text;
              break;
          }
      }

      const handle_description = description;
      const format_description_text = handle_description.replace('','').replace('POKéMON', 'POKÉMON').replace('POKéMON', 'POKÉMON').replace('POKéMON', 'POKÉMON');
 
      const num_types = [];
      for(let n of first_data.types){
          num_types.push(n);
      };

      let type_one = "";
      let type_two = "";
      let type_three = "";
      let type_four = "";
      let type_five = "";

      try{
          type_one = first_data.types[0].type.name.toUpperCase();
      }catch(e){
          type_one = "";
      }
      try{
          type_two = first_data.types[1].type.name.toUpperCase();
      }catch(e){
          type_two = "";
      }
      try{
          type_three = first_data.types[2].type.name.toUpperCase();
      }catch(e){
          type_three = "";
      }
      try{
          type_four = first_data.types[3].type.name.toUpperCase();
      }catch(e){
          type_four = "";
      }
      try{
          type_five = first_data.types[4].type.name.toUpperCase();
      }catch(e){
          type_five = "";
      }

      function type_check_validation(a){
          let answer = "";
          if (a == "BUG"){
              answer = `<a class="type" style="background-color:#729F3F">${a}</a>`;
          } if (a == "DRAGON"){
              answer = `<a class="type" style="background-color:##DC143C">${a}</a>`;
          } if (a == "FAIRY"){
              answer = `<a class="type" style="background-color:#FF69B4">${a}</a>`;
          } if (a == "FIRE"){
              answer = `<a class="type" style="background-color:#FD7D24">${a}</a>`;
          } if (a == "GHOST"){
              answer = `<a class="type" style="background-color:#D3D3D3">${a}</a>`;
          } if (a == "GROUND"){
              answer = `<a class="type" style="background-color:#808000">${a}</a>`;
          } if (a == "NORMAL"){
              answer = `<a class="type" style="background-color:#A4ACAF">${a}</a>`;
          } if (a == "PSYCHIC"){
              answer = `<a class="type" style="background-color:#FFC0CB">${a}</a>`;
          } if (a == "STEEL"){
              answer = `<a class="type" style="background-color:#D3D3D3">${a}</a>`;
          } if (a == "DARK"){
              answer = `<a class="type" style="background-color:#555C64">${a}</a>`;
          } if (a == "ELECTRIC"){
              answer = `<a class="type" style="background-color:#FFDB58">${a}</a>`;
          } if (a == "FIGHTING"){
              answer = `<a class="type" style="background-color:#FF4500">${a}</a>`;
          } if (a == "FLYING"){
              answer = `<a class="type" style="background-color:#7D5B8C">${a}</a>`;
          } if (a == "GRASS"){
              answer = `<a class="type" style="background-color:#C3E4D3">${a}</a>`;
          } if (a == "ICE"){
              answer = `<a class="type" style="background-color:#BDDEEC">${a}</a>`;
          } if (a == "POISON"){
              answer = `<a class="type" style="background-color:#DB7093">${a}</a>`;
          } if (a == "ROCK"){
              answer = `<a class="type" style="background-color:#4B3621">${a}</a>`;
          } if (a == "WATER"){
              answer = `<a class="type" style="background-color:#4682B4">${a}</a>`;
          }

          if (answer == undefined){return ""}
          else {return answer};
      }

      if (true){
          document.querySelector("#card-list").insertAdjacentHTML("beforeend", `
          <div class="card">
              <img class="character_image" src=${image}>
              <div class="character_information">                    
                  <p class="name">N ${id} - ${name.toUpperCase()}</p>
                  <div class="types">
                      ${type_check_validation(type_one)}
                      ${type_check_validation(type_two)}
                      ${type_check_validation(type_three)}
                      ${type_check_validation(type_four)}
                      ${type_check_validation(type_five)}
                  </div>
                  <button type="button" class="show_description" onclick="show_description()">Show information</button>
                  <span class="span-modal-infos">
                        <p id="modal-title">Information</p>
                        <div class="container-modal">
                            <a href="#" class="close-button" onclick="close_description()"><img class="stats-icon" src="./assets/images/close.png"></a>
                            <div class="container_images">
                                <div class="container-image-and-infos">
                                    <div class=poke-and-infos>
                                        <img class="character_image" src=${image}>
                                        <p class="name">N ${id} - ${name.toUpperCase()}</p>
                                        <div class="types">
                                            ${type_check_validation(type_one)}
                                            ${type_check_validation(type_two)}
                                            ${type_check_validation(type_three)}
                                            ${type_check_validation(type_four)}
                                            ${type_check_validation(type_five)}
                                        </div>
                                        <p class="pokemon_description">${format_description_text}</p>
                                    </div>

                                    <div class="stats">
                                        <p><img class="stats-icon" src="./assets/images/hp.png">${hp}</p>
                                        <p><img class="stats-icon" src="./assets/images/power-fight.png">${attack}</p>
                                        <p><img class="stats-icon" src="./assets/images/defense.png">${defence}</p>
                                        <p><img class="stats-icon" src="./assets/images/special-attack.png">${special_attack}</p>
                                        <p><img class="stats-icon" src="./assets/images/special-defense.png">${special_defense}</p>
                                    </div>
                                </div>
                                <div class="evolution">
                                    <p class="evolution-title">Evolutionary chain</p>
                                    <p class="evolution-description">The evolutionary chain of Pokémon consists of the process by which a Pokémon evolves from one form to another. Each Pokémon has one or more evolutionary forms, which can be achieved through different mechanisms, such as leveling up, using items, trading, among others.</p>
                                    <p class="evolution-description">As they evolve, Pokémon usually gain new abilities, improved statistics, and changes in their appearance. Some Pokémon have different forms, such as regional forms or mega-evolved forms, which allow them to change drastically in appearance and abilities. The evolutionary chain is an important part of the gameplay and mythology of Pokémon games.</p>
                                    <div class=evolution-chain>
                                        <div>
                                            <img class="character_image" src=${valid_evolution_image_first}>
                                            <p class="name">N ${valid_evolution_id_first}</p>
                                            <p class="name">${evolution_name_first.toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <img class="character_image" src=${valid_evolution_image_second}>
                                            <p class="name">N ${valid_evolution_id_second}</p>
                                            <p class="name">${evolution_name_second.toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <img class="character_image" src=${valid_evolution_image_third}>
                                            <p class="name">N ${valid_evolution_id_third}</p>
                                            <p class="name">${evolution_name_third.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </span>
              </div>
          </div>
          `);
      } 
  });
}

function show_description(){
  const buttons = document.querySelectorAll(".show_description")
  for (let n of buttons){
      n.addEventListener("click", function(){
          n.parentElement.querySelector(".span-modal-infos").style.display="unset";
      });
  }
}

function close_description(){
  const description = document.querySelectorAll(".span-modal-infos");

  for (let n of description){
      n.style.display="none";
  }
}

async function pages(from = 0, to = 99) {

  const all_cards = document.querySelectorAll(".card")
  for (let n of all_cards){
      n.style.display = "none";
  }
  
  const qtd = from + to

  for (let i = from; i <= qtd; i++){
      await new Promise((resolve) => {
          resolve(get_pokemons(i));
      });
  }
}

pages(0, 124);