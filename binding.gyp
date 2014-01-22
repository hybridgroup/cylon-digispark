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
      ]
    },
  ],
}
