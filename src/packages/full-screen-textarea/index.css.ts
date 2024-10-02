const css: Record<string, Object> = {
  main: {
    width: '100%',
    height: '100vh',
    position: 'relative',
    boxSizing: 'border-box',
    padding: '24px  24px'
  },
  textarea: {
    position: 'absolute',
    appearance: 'none',
    border: '0 none',
    outline: '0 none',
    top: '68px',
    left: 0,
    width: '100%',
    height: 'calc(100vh - 68px)',
    boxSizing: 'border-box',
    padding: '12px 150px 0 12px',
    background: 'transparent',
    zIndex: 999
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '44px'
  },
  done: {
    fontSize: '16px'
  },
  button: {
    width: 'fit-content',
    background: '#fa5151',
    color: '#fff',
    display: 'block',
    margin: '0'
  },
  operation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '44px',
    marginTop: '120px'
  },
  operaBtn: {
    width: '100px',
    margin: '0 12px 0 0',
    color: '#333'
  },
  list: {
    display: 'block',
    marginTop: '10px'
  },
  item: {
    display: 'block',
    fontSize: '18px',
    lineHeight: '40px',
    fontWight: 'bold',
    color: '#333'
  }
};
export default css;
