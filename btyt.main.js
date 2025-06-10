window.addEventListener("load", () => {
  if (location.pathname === "/") {
    const processedElements = new Set(); // Store processed elements

    const observer = new MutationObserver(() => {
      const videosMeta = getVideosMeta();

      videosMeta.forEach((meta) => {
        if (!processedElements.has(meta)) {
          // Check if the element is already processed
          processedElements.add(meta); // Add the element to the Set
          const data = getChannelData(meta);
          data.ele.addEventListener("mouseenter", (e) => {
            displayPopup(data);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
});

function displayPopup(data) {}

function getVideosMeta() {
  // Select only the top-level elements with the class, not nested ones
  return document.querySelectorAll("#details");
}

function getChannelData(element) {
  // Assuming the channel name is within an <a> tag inside the element
  const ele = element.querySelector("#channel-name");
  const name = ele?.querySelector("a")?.textContent?.trim();
  const link = ele?.querySelector("a")?.href;
  return { ele, name, link, id: link?.split("/").pop() };
}
