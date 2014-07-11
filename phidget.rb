require 'rubygems'
require 'phidgets-ffi'

puts "Library Version: #{Phidgets::FFI.library_version}"

puts "Wait for PhidgetInterfaceKit to attach..."

begin
Phidgets::InterfaceKit.new do |ifkit|
	puts "attached: #{ifkit.serial_number}"


	ifkit.on_detach  do |device, obj|
		puts "#{device.attributes.inspect} detached"
	end

	ifkit.on_error do |device, obj, code, description|
		puts "Error #{code}: #{description}"
	end

	ifkit.on_input_change do |device, input, state, obj|
		puts "event: {phidgetId:#{input.index}, state:#{state}}"
		#var input like this (which button, on/off)
	end

	ifkit.on_output_change do |device, output, state, obj|
		puts "Output #{output.index}'s state has changed to #{state}"
	end

	sleep(100000)
end
rescue Phidgets::Error::Timeout => e
  puts "Exception caught: #{e.message}"
end

