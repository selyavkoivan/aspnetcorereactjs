import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteConfirmationModal extends React.Component {
    state = {
        name: '',
    };

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    handleDelete = () => {
        this.props.onDelete(this.state.name);
    };

    render() {
        const { isOpen, toggle, targetClassName } = this.props;
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Подтвердите удаление {targetClassName}</ModalHeader>
                <ModalBody>
                    <p>Введите название {targetClassName}, чтобы подтвердить удаление:</p>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.handleDelete}>
                        Удалить
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Отмена
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default DeleteConfirmationModal;
