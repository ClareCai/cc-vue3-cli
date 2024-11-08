/**
 * 复制文本
 * @param options { text }
 */
export const copyText = (options) => {
  const props = { origin: true, ...options };

  let input;

  if (props.origin) input = document.createElement('textarea');
  else input = document.createElement('input');

  input.setAttribute('readonly', 'readonly');
  input.value = props.text;
  document.body.appendChild(input);
  input.select();
  if (document.execCommand('copy')) document.execCommand('copy');
  document.body.removeChild(input);
};
