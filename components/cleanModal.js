const React = require('react');
const Modal = require('react-bootstrap/lib/Modal');
const Button = require('react-bootstrap/lib/Button');

var CleanModal = function(props) {
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.content}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.actions.closeModal()}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

module.exports = CleanModal
