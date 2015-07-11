{
  'targets': [
    {
      'target_name': 'digispark',
      'sources': [
        'src/digispark.cc',
        'src/littleWire.c',
        'src/littleWire_servo.c',
        'src/littleWire_util.c',
        'src/opendevice.c'
      ],
      'libraries': [
        '-lusb'
      ],
      "include_dirs" : [
          "<!(node -e \"require('nan')\")"
      ]
    },
    {
      "target_name": "action_after_build",
      "type": "none",
      "dependencies": [ "<(module_name)" ],
      "copies": [
        {
          "files": [ "<(PRODUCT_DIR)/<(module_name).node" ],
          "destination": "<(module_path)"
        }
      ]
    }
  ],
}
