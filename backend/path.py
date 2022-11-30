from flask import Blueprint, abort, jsonify
from werkzeug.exceptions import NotFound

root = {
    'type': 'dir',
    'children': {
        'home': {
            'type': 'dir',
            'children': {
                'myname': {
                    'type': 'dir',
                    'children': {
                        'filea.txt': {
                            'type': 'file',
                        },
                        'fileb.txt': {
                            'type': 'file',
                        },
                        'projects': {
                            'type': 'dir',
                            'children': {
                                'mysupersecretproject': {
                                    'type': 'dir',
                                    'children': {
                                        'mysupersecretfile': {
                                            'type': 'file',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
}

bp = Blueprint('path', __name__, url_prefix='/path')


@bp.route('/', defaults={'target': ''}, methods=['GET'])
@bp.route('/<path:target>', methods=['GET'])
@bp.route('/<path:target>/', methods=['GET'])
def file_explorer(target):
    try:
        path_type(root, target)
        return jsonify(get_content(root, target)), 200

    except NotFound:
        abort(404, description='directory or file not found')
    except Exception as e:
        abort(422, description=f'{e}')


def path_type(directory, target):
    path_components = target.split('/')
    (top, rest) = (path_components[0], path_components[1:])

    try:
        target = directory['children'][top] if target else directory
        if not rest:
            return target['type']
        else:
            return path_type(target, '/'.join(rest))
    except KeyError:
        raise NotFound()


def get_content(directory, target):
    path_components = target.split('/')
    (top, rest) = (path_components[0], path_components[1:])
    target = directory['children'][top] if target else directory

    if not rest:
        if target['type'] == 'dir':
            return {
                'name': top,
                'type': 'dir',
                'content': {
                    filename: {'type': metadata['type']}
                    for filename, metadata in target['children'].items()
                }
            }

        elif target['type'] == 'file':
            return {
                'name': top,
                'type': 'file',
                'content': f'THIS IS FILE {top}'
            }

        else:
            raise Exception('Unknown target type.')
    else:
        return get_content(target, '/'.join(rest))
