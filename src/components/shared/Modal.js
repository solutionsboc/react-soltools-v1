import React, { useRef, useEffect, useCallback } from 'react';
// import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Table from '../../components/shared/Table';
import TableData from '../../components/shared/TableData';

const Background = styled.div`
  ${'' /* width: 100%;
  height: 100%; */}
  width: 300%;
  height: 300%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  ${'' /* display: grid; */}
  overflow: scroll;
  grid-template-columns: 1fr 0fr;
  position: relative;
  ${'' /* z-index: 10; */}
  border-radius: 10px;
  ${'' /* margin-top: -200px; */}
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: .8;
  color: #141414;
  padding: 1px 1px 1px 1px;
  margin: 20px 50px 20px 20px;
  word-wrap: break-word;
  white-space: nowrap;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
    margin-top: 8px;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({ showModal, setShowModal, data, columns, table }) => {
  const modalRef = useRef();

  // const columns = [
  //   { field: "id", header: "#" },
  //   { field: "title", header: "Title" },
  // ];

  // const animation = useSpring({
  //   config: {
  //     duration: 250
  //   },
  //   opacity: showModal ? 1 : 0,
  //   transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  // });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          {/* <animated.div style={animation}> */}
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                {/* <div>
                  <ul>
                    {data.map(result => (
                      <li key={result.id}>{result.title}</li>
                    ))}
                  </ul>
                </div> */}
                {table ? <Table data={data} columns={columns} hover={true} striped={true} /> : <TableData data={data} columns={columns} hover={true} striped={true} /> }
                {/* <Table data={data} columns={columns} hover={true} striped={true} /> */}

                {/* <button>Do smth</button> */}
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </ModalWrapper>
          {/* </animated.div> */}
        </Background>
      ) : null}
    </>
  );
};

/**
 * usage of component
 * eg:
 * <Modal showModal={showModal} setShowModal={setShowModal} data={data} columns={columns} table={false} />
 * <Modal showModal={showModal} setShowModal={setShowModal} data={dataFetch} columns={columns} table={true}/>
 */