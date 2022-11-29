from flask import Blueprint, abort, jsonify

bp = Blueprint('path', __name__, url_prefix='/path')


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


@bp.route('/<path:target>', methods=['GET'])
def get_contents(target):
    if not path_type(root, target.split('/')):
        abort(404)
    else:
        return jsonify(get_content(root, target.split('/')))


def path_type(directory, path_components):
    (top, rest) = (path_components[0], path_components[1:])
    target = directory['children'][top]

    try:
        if not rest:
            return target['type']
        else:
            return path_type(target, rest)
    except KeyError:
        return False


def get_content(directory, path_components):
    (top, rest) = (path_components[0], path_components[1:])
    target = directory['children'][top]

    if not rest:
        if target['type'] == 'dir':
            return {
                k: {'type': v['type']}
                for k, v in target['children'].items()
            }
        elif target['type'] == 'file':
            return f'THIS IS FILE {top}'
        else:
            raise Exception('Unknown target type.')
    else:
        return get_content(target, rest)
