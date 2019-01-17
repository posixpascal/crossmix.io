$(() => {
   state.mix.subscribe(() => {
      const mix = state.mix.getState();
      $.ajax({
          url: "/mixes/" + mix.name + "?key=" + (window.location.hash.substr(1) || ""),
          method: "PATCH",
          data: { mix },
          success: () => {
              console.log("saved");
          }
      })
   });
});