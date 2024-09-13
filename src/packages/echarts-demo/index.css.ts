const style: Record<string, any> = {
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: '10px 15px',
  },
  baseItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'calc((100vw - 60px) / 3)',
    marginBottom: '15px'
  },
  item(index: number) {
    if (index % 3 === 1) {
      return {
        ...style.baseItem,
        marginLeft: '15px',
        marginRight: '15px'
      };
    }
    return style.baseItem;
  },
  poster: {
    display: 'block',
    width: '100px',
    height: '100px',
    backgroundColor: '#f3f3f3',
    border: '1px solid #eee',
    boxSizing: 'border-box',
    padding: '20px',
    marginBottom: '10px'
  },
  image: {
    display: 'block',
    width: '100%',
    height: '100%'
  },
  text: {

  },
  list: {
    display: 'block',
    margin: '10px 15px',
  },
  button: {
    margin: '10px 0',
    display: 'block',
    width: '100%',
  }
};

export default style;
