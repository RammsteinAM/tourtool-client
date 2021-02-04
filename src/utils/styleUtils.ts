export const getDescriptionHeight = (text: string, width: number): number => {
    const el = document.createElement('div');
    const id = 'descriptopn-height-temp-element'
    el.id = id;
    el.innerText = text;
    el.style.cssText = `width: ${width}px; visibility: hidden; position: fixed; font-size: 13px;`;
    document.body.appendChild(el);
    const node = document.getElementById(id);
    const height: number = node!.offsetHeight;
    node?.remove();
    return height + 45;
}