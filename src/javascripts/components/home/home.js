import utilities from '../../helpers/utilities';

const title = () => {
  const domString = '<h1>Pinterest</h1>';
  utilities.printToDom('titlePage', domString);
};

export default { title };
