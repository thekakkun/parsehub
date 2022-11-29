from flask import Blueprint, abort, jsonify

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


@bp.route('/', defaults={'target': 'home'})
@bp.route('/<path:target>', methods=['GET'])
@bp.route('/<path:target>/', methods=['GET'])
def get_contents(target):
    if not path_type(root, target):
        abort(404, description="directory or file not found")
    else:
        return jsonify(get_content(root, target)), 200


def path_type(directory, target):
    path_components = target.split('/')
    (top, rest) = (path_components[0], path_components[1:])

    try:
        target = directory['children'][top]
        if not rest:
            return target['type']
        else:
            return path_type(target, '/'.join(rest))
    except KeyError:
        return False


def get_content(directory, target):
    path_components = target.split('/')
    (top, rest) = (path_components[0], path_components[1:])
    target = directory['children'][top]

    if not rest:
        if target['type'] == 'dir':
            return {
                'name': top,
                'type': 'dir',
                'content': {
                    k: {'type': v['type']}
                    for k, v in target['children'].items()
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
