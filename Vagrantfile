# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty64"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 7070, host: 7070, auto_correct: true
  config.vm.network "forwarded_port", guest: 8080, host: 8080, auto_correct: true

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.network "private_network", ip: "192.168.10.13"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"
  config.vm.synced_folder ".", "/var/www", create: true, group: "vagrant", owner: "vagrant"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.
  config.vm.provider "virtualbox" do |vb|
    # Set name of the box in VB
    vb.name = "goontube"

    # Customize the the vm
    vb.cpus = 2
    vb.memory = 1024
  end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   sudo apt-get update
  #   sudo apt-get install -y apache2
  # SHELL
  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    # Silence tty and stdin "errors"
    sudo rm -v /etc/apt/apt.conf.d/70debconf &> /dev/null
    sudo dpkg-preconfigure -f noninteractive -p critical &> /dev/null
    sudo dpkg --configure -a &> /dev/null

    echo "Installing system packages"
    sudo apt-get install git git-flow htop subversion wget -y > /dev/null

    echo "Installing Node.js"
    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - &> /dev/null
    sudo apt-get install nodejs -y > /dev/null

    echo "Setting up global NPM installation path"
    mkdir /home/vagrant/.npm
    mkdir /home/vagrant/.npm-global
    chown -R vagrant:vagrant /home/vagrant/.npm
    chown -R vagrant:vagrant /home/vagrant/.npm-global

    echo "export PATH=~/.npm-global/bin:$PATH" >> ~/.profile
    source ~/.profile

    npm config set prefix "/home/vagrant/.npm-global" > /dev/null
    sudo npm config set prefix "/home/vagrant/.npm-global" > /dev/null

    echo "Installing global node modules"
    npm install -g pm2 webpack webpack-dev-server &> /dev/null

    echo "Initialize the toobz"
    cd /var/www
    npm install &> /dev/null
    webpack > /dev/null

    echo "VM provisioned successfully!"
  SHELL
end
