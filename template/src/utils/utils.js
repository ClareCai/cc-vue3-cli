export const downloadFile = function (fileData, fileType) {
  const Temp = document.createElement('a');
  let fileName = '';
  if (fileData.headers) {
    const disposition = fileData.headers['content-disposition'];
    fileName = decodeURIComponent(
      disposition.substring(disposition.indexOf('filename=') + 9, disposition.length),
    );
    fileData = fileData.data;
  }
  let type = '';
  switch (fileType) {
    case 'XMind':
      type = 'application/vnd.xmind.workbook;charset=utf-8';
      break;
    case 'word':
      type =
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8';
      break;
    case 'excel':
      type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8';
      break;
    default:
      break;
  }
  const blob = new Blob([fileData], { type });
  Temp.href = window.URL.createObjectURL(blob);
  Temp.download = fileName;
  Temp.click();
  Temp.remove();
};

// 数组分组函数
export const groupBy = function (array, size) {
  if (!Array.isArray(array) || array.length === 0) return [];
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size),
  );
};

// 毫秒转时分秒
export const formatDuration = (millisecond) => {
  const seconds = Math.floor(millisecond / 1000);
  const hours = Math.floor(seconds / 3600); // 小时
  const minutes = Math.floor((seconds % 3600) / 60); // 分钟
  const remainingSeconds = Math.floor(seconds % 60); // 剩余的秒数

  // 格式化输出，如果小时或分钟为0，确保至少显示0
  const formattedHours = hours > 0 ? `${hours}:` : '00:';
  const formattedMinutes = minutes > 9 ? `${minutes}:` : `0${minutes}:`;
  const formattedSeconds = remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`;

  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
};

// 数字格式化
export const formatNumber = (value) => {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';

  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }

  if (num) {
    result = num + result;
  }

  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
};
