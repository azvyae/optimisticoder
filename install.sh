#######################################
# Display version
#######################################
display_version() {
	local version=$(git describe --tags --abbrev=0)
	package_json=$(cat package.json)

	contributors=$(echo "$package_json" | jq -r '.contributors')
	max_contributors=3
	contributor_count=$(echo "$contributors" | jq -r 'length')

	formatted_contributors=""
	for ((i = 0; i < $contributor_count; i++)); do
		contributor_name=$(echo "$contributors" | jq -r ".[$i].name")
		contributor_email=$(echo "$contributors" | jq -r ".[$i].email")
		formatted_contributor="${contributor_name} <${contributor_email}>"
		if [[ $i -eq 0 ]]; then
			formatted_contributors=$formatted_contributor
		elif [[ $i -lt $max_contributors ]]; then
			formatted_contributors="${formatted_contributors}, ${formatted_contributor}"
		fi
	done
	if (($contributor_count > $max_contributors)); then
		formatted_contributors="$formatted_contributors, and more"
	fi
	show_logo
	echo "Version $version"
	echo "Contributors: [$formatted_contributors]"
	echo
}

#######################################
# Show logo.
#######################################
show_logo() {
	echo
	echo "               ████████████                 "
	echo "             ████████████████               "
	echo "            ▓██████████████████▓            "
	echo "           ▓████████████████████            "
	echo "           ███████████     █████            "
	echo "           ███████████     ░████▓           "
	echo "           █████████████    ███▓            "
	echo "            ██░           █████             "
	echo "            ░██████████████████             "
	echo "            ░█░  ▓█ ▓██   █ ░█░░            "
	echo "             ██     █ ░█    ░█░             "
	echo "             ░░████▓░  ▓█████▓              "
	echo "                    ░ ░▓░   ░               "
	echo "                   ░░ ░░░  ░                "
	echo "                ░         ░                 "
	echo "                   ▓▓░▓█░                   "
	echo "--------------------------------------------"
	echo "          Optimisticoder is Here!           "
}

#######################################
# Display help
#######################################
display_help() {
	# Display Help
	display_version
	echo "Usage: ./install.sh [OPTIONS]"
	echo
	echo "Options:"
	echo "-h, --help                Print this Help."
	echo "-v, --version             Print software version and exit."
	echo "-i, --install             Run installation script"
	echo
	echo "Options if you using -i or --install"
	echo "    --env environment     Env for installing this app"
	echo "                          <local|production>"
	echo "    --env-key key         Env crypted key for decrypting file"
	echo
}

#######################################
# Display and outputs error message to stderr.
#######################################
err() {
	echo
	echo -e "\033[1;31m [$(date +'%Y-%m-%dT%H:%M:%S%z')]: $* \033[0m" >&2
	echo
}

#######################################
# Display and outputs error message to stdout.
#######################################
success() {
	echo
	echo -e "\033[1;32m $* \033[0m" >&1
	echo
}

#######################################
# Prepare installation variables.
#######################################
prep_install() {
	local env
	local env_key

	while [[ $# -gt 0 ]]; do
		key="$1"
		case $key in
		--env)
			env="$2"
			shift
			;;
		--env-key)
			env_key="$2"
			shift
			;;
		*)
			echo "Invalid option: $key"
			display_help
			exit 1001
			;;
		esac
		shift
	done

	if [[ $env != "local" && $env != "production" ]]; then
		err "You must select between --env local, or production"
		exit 1002
	fi

	if [[ -z "$env_key" ]]; then
		err "You must provide --env-key either for environment $env"
		exit 1002
	fi

	echo "Preparing installation of the app"
	sleep 0.3
	echo "With environment [$env]"
	sleep 0.3
	echo "And env key ["$(echo "$env_key" | tr '[:print:]' '*')"]"
	echo

	if install $env $env_key; then
		success "Successfully installed the application"
	else
		err "Failed to install application"
		exit 1005
	fi
	sleep 2
}

#######################################
# Install main application.
#######################################
install() {
	local env=$1
	local env_key=$2
	local env_key_var

	case $env in
	local) env_key_var=ENV_KEY_LOCAL ;;
	production) env_key_var=ENV_KEY_PRODUCTION ;;
	esac

	echo Installing dependencies and decrypting .env file

	if pnpm i && (export $env_key_var=$env_key CI=true && npx env-decrypt $env); then
		success "Successfully setup NPM dependencies"
	else
		err "Failed to setup NPM dependencies"
		exit 1005
	fi

	mv -f $(dirname $(readlink -f $0))/.env.$env $(dirname $(readlink -f $0))/.env
}

#######################################
# Main Application
#######################################
while [[ $# -gt 0 ]]; do
	key="$1"
	case $key in
	-h | --help)
		display_help
		exit 0
		;;
	-v | --version)
		display_version
		exit 0
		;;
	-i | --install)
		shift
		prep_install "$@"
		exit 0
		;;
	*)
		echo "Invalid option: $key"
		display_help
		exit 1001
		;;
	esac
	shift
done

display_help
