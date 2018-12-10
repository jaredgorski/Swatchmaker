export function generateSwatchData(swatchObject) {
  const swatchMarkup = createSwatchMarkup(swatchObject);

  var data = `<svg xmlns="http://www.w3.org/2000/svg" style="height: 100%; width: 100%">
                <foreignObject width="100%" height="100%">
                  <div xmlns="http://www.w3.org/1999/xhtml" style="height: 100%; width: 100%">
                    ${swatchMarkup}
                  </div>
                </foreignObject>
              </svg>`;

  return data;
}

function createSwatchMarkup(swatchObject) {
  const swatchFg = createSwatchFg(swatchObject);
  const swatchMarkup = `
    <div style="background-color: ${swatchObject.colors.bg[0]}; box-sizing: border-box; display: flex; height: 100%; padding: 2%; width: 100%">
      ${swatchFg}
    </div>
  `;

  return swatchMarkup;
}

function createSwatchFg(swatchObject) {
  let swatchFg = '';

  for (let i = 0; i < swatchObject.colors.fg.length; i++) {
    swatchFg += `<div style="background-color: ${swatchObject.colors.fg[i]}; display: inline-flex; height: 100%; width: calc(100% / ${swatchObject.colors.fg.length});"></div>`
  };

  return swatchFg;
}
